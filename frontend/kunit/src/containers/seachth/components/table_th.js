import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.css';
import '../../../assets/css/table.css'
import '../../../assets/css/search.css'

import Tasklist from '../../../assets/icon/tasklist.svg';
import Checklist from '../../../assets/icon/checklist.svg';

require('react-bootstrap-table-next/dist/react-bootstrap-table2.min.css');

/* eslint no-eval: 0 */
class Table extends Component {
  constructor(props){
  	super(props)
		this.state={
        subject:"",
        checked:""
		}
    this.handleSetIndex=this.handleSetIndex.bind(this)
    this.handleChecked=this.handleChecked.bind(this)
    
  }

  componentDidUpdate(){
    if (this.state.checked === "del"){
      this.props.del(this.state.subject)
      this.setState({checked : ""})
    }else{ 
      this.props.del("")
    }
  }
  
  

  handleChecked = (e) =>{
      this.setState({checked:e})
    }
     
  handleSetIndex = (e) =>{
    this.setState({subject:e})
  }
  
  render()
  {
    const rowEvents = {
      onClick: (e,row,rowIndex) => {
        this.handleSetIndex(row.subject.slice(0,8))
    }}

    function delSubject(cell,row,rowIndex){
      
      return(
        <button type="button" className="btn btn-danger btn-sm btn-space ">Delete</button>
      )
    }

	const columns = [{
      dataField: 'subject',
      text: 'วิชา',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      dataField: 'credit',
      text: 'หน่วยกิต',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      dataField: 'by',
      text: 'สังกัด',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      events:{
        
        onClick: ()=>{this.handleChecked("del")
                     
      }
      },
      dataField: 'del',
      text: 'Delete',
      formatter: delSubject
      
    }]
  
    const columns1 = [{
      dataField: "1",
      text: 'กลุ่มสาระ',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      dataField: "3",
      text: 'หน่วยกิตที่ลง',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      dataField: "2",
      text: 'หน่วยกิตที่บังคับ',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    },{
      dataField: "4",
      text: 'เหลือต้องลงอีกกี่หน่วยกิต',
      align: (column, colIndex) => 'left',
      headerAlign: (column, colIndex) => 'left'
    }]
  
    
    return (
      <div className="Table">
        <div style={{paddingTop: 30}}></div>
            <h3>วิชาที่ลงทะเบียน  <img src={Tasklist} width="25px" alt="icon-tasklist"/></h3><br/>
            <BootstrapTable keyField="subject"  data={eval(this.props.table) } rowEvents={rowEvents} columns={ columns }  tdStyle={ { whiteSpace: 'normal'} } bodyStyle={{overflow: 'overlay'}} noDataIndication={ "ยังไม่ได้เลือกวิชาที่จะลง" } condensed striped bordered={ false }/>
        

        <br/><br/>
        <h3>หน่วยกิตรวม  <img src={Checklist} width="25px" alt="icon-checklist"/></h3><br/>  
          <BootstrapTable keyField="1" isKey={true} data={eval(this.props.programTable)} columns={ columns1 }  tdStyle={ { whiteSpace: 'normal'}} bodyStyle={{overflow: 'overlay'}} bordered={ false }/>
        <div>
         
        </div>
	  </div>
    );
  }
}

export default Table;
