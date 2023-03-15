<template>
  <div>
    <!--  {{bookinfoList}}-->
    <el-form ref="searchForm" :inline="true" :model="searchWhere"  size="mini">
      <el-form-item  label="书名" size="mini" prop="bookName">
        <el-input style="width: 150px" v-model="searchWhere.bookName"></el-input>
      </el-form-item>
      <el-form-item label="出版社" size="mini" prop="press">
        <el-input style="width: 150px" v-model="searchWhere.press"></el-input>
      </el-form-item>
      <el-form-item label="图书类型" size="mini" prop="bookType">
        <el-select v-model="searchWhere.bookType" placeholder="图书类别" style="width: 120px">
          <el-option v-for="option in bookTypeOptions"
                     :key="option.type"
                     :label='option.name'
                     :value="option.type"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出版日期" size="mini" prop="publicationdate">
        <el-date-picker
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="起始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            v-model="searchWhere.publicationdate" >
        </el-date-picker>
      </el-form-item>
      <el-form-item size="mini">
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
        <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
        <el-dialog title="添加图书" :visible.sync="dialogFormVisible">
          <el-form ref="addRef" :model="addBookForm">
            <el-form-item label="图书名称" prop="bookName">
              <el-input v-model="addBookForm.bookName" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="图书书号" prop="bookIBSN">
              <el-input v-model="addBookForm.bookIBSN" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input v-model="addBookForm.author" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="出版社" prop="press">
              <el-input v-model="addBookForm.press" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="出版日期" prop="publicationdate">
              <el-date-picker v-model="addBookForm.publicationdate"></el-date-picker>
            </el-form-item>
            <el-form-item label="价格" prop="price">
              <el-input v-model="addBookForm.price" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="库存" prop="quantity">
              <el-input v-model="addBookForm.quantity" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="图书类型" prop="bookType">
              <el-select v-model="addBookForm.bookType" placeholder="请选择图书类型">
                <el-option
                    v-for="option in bookTypeOptions"
                    :key="option.type"
                    :label="option.name"
                    :value="option.type"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAddBook">取消</el-button>
            <el-button type="primary" @click="addABook">确定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
    <el-table
        :data="bookinfoList"
        border
        stripe
        style="width: 100%">
      <el-table-column
          fixed
          type="index"
          width="50">
      </el-table-column>
      <el-table-column
          prop="bookName"
          fixed
          label="书名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="bookIBSN"
          label="书号"
          width="140">
      </el-table-column>
      <el-table-column
          prop="publicationdate"
          label="出版日期"
          width="150">
      </el-table-column>

      <el-table-column
          prop="author"
          label="作者"
          width="120">
      </el-table-column>
      <el-table-column
          prop="press"
          label="出版社"
          width="160">
      </el-table-column>
      <el-table-column
          prop="price"
          label="价格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="quantity"
          label="库存数量"
          width="100">
      </el-table-column>
      <el-table-column
          prop="bookType"
          label="图书类型"
          width="120">
        <template slot-scope="scope">
          <span>{{scope.row.bookType|bookTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="editBookInfo(scope.row.id)" size="small">编辑</el-button>
          <el-button type="text" @click="delBookInfo(scope.row.id)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import bookinfoApi from "@/api/bookinfo";
const bookTypeOptions = [
  {type:'1',name:'编程类'},
  {type: '2',name: '前端类'},
  {type: '3',name:'设计类'},
  {type: '4',name:'地质类'}
]
export default {
  name: "press",
  created() {
    this.fetchData()
  },
  data(){
    return {
      total:0,
      currentPage:1,
      pageSize:10,
      searchWhere:{
        bookName: '',
        press : '',
        bookType: '',
        publicationdate: ''
      },
      bookinfoList:[],
      bookTypeOptions : [
        {type:'1',name:'编程类'},
        {type: '2',name: '前端类'},
        {type: '3',name:'设计类'},
        {type: '4',name:'地质类'}
      ],
      pickerOptions : {
        shortcuts : [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime()-3600*1000*24*7)
            picker.$emit('pick',[start,end])
          }
        },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime()-3600*1000*24*7)
              picker.$emit('pick',[start,end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime()-3600*1000*24*30)
              picker.$emit('pick',[start,end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime()-3600*1000*24*90)
              picker.$emit('pick',[start,end])
            }
          },]
      },
      dialogFormVisible:false,
      addBookForm: {
        bookName: '',
        bookIBSN: '',
        author: '',
        press : '',
        price: '',
        quantity: '',
        publicationdate: ''
      }

    }
  },
  methods:{
    fetchData() {
      const res = bookinfoApi.searchBookList(this.currentPage,this.pageSize,this.searchWhere).then(response => {
        const resp = response.data
        this.bookinfoList = resp.data.rows
        this.total = resp.data.total
      })
    },
    cancelAddBook(){
      this.dialogFormVisible = false
      this.$refs.addRef.resetFields()
    },
    addABook(){
      this.dialogFormVisible = false
      const res = bookinfoApi.addABooktoList(this.currentPage,this.pageSize,this.addBookForm).then(response => {
        const resp = response.data
        this.bookinfoList = resp.data.rows
        this.total = resp.data.total
      })
      this.$refs.addRef.resetFields()
    },
    editBookInfo(id){
      this.$message(
          {
            message:`你编辑了第${id}号书籍信息`,
            type: 'warning'
          }
      )
    },
    delBookInfo(id){
      this.$message(
          {
            message:`你删除了第${id}号书籍信息`,
            type: 'warning'
          }
      )
    },
    handleSizeChange(size){
      this.pageSize = size
      this.fetchData()
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage
      this.fetchData()
    },
    resetSearch() {
      this.$refs.searchForm.resetFields()
    }
  },
  rules:{
    bookISBN:[
      {required:true,message:'请输入书号',trigger:'blur'}
    ],
    bookName:[
      {required:true,message:'请输入书名',trigger:'blur'}
    ],
    publicationdate:[
      {required:true,message:'请选择日期',trigger:['blur','change']}
    ],
    quantity:[
      {required:true,message:'数量不能为空',trigger:'blur'},
      {type:'number',message:'数量必须为数字',trigger:'blur'}
    ]
  },
  filters:{
    bookTypeFilter(type){
      const bookTypeOption = bookTypeOptions.find(obj => obj.type===type)
      return bookTypeOption?bookTypeOption.name:null
    }
  }
}
</script>

<style scoped>

</style>
