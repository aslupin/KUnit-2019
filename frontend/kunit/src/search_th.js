import React, { Component } from 'react';
import Select from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import './Search.css'
import axios from 'axios'
import Table from './table_th'
import MyJson from './long.json'
import MyJson_th from './THshort.json'

class Search extends Component{
    constructor(props){
        super(props)
          this.state={
            selectedOption: "[[0,0,0,0,0,0],[],[],[],[],[]]",
            table: "[]",
            wordS: "พิมพ์/เลือก วิชาที่ต้องการจะลง",
            programTable: "[{1:" +  "\""+"กลุ่มสาระอยู่ดีมีสุข"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" + "0" +",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"},"+"{1:" +  "\""+"กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" + "0" +",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"},"+"{1:" +  "\""+"กลุ่มสาระพลเมืองไทยและพลเมืองโลก"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" +  "0"+",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"},"+"{1:" +  "\""+"กลุ่มสาระภาษากับการสื่อสาร"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" +  "0"+",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"},"+"{1:" +  "\""+"กลุ่มสาระสุนทรียศาสตร์"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" + "0"+",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"},"+"{1:" +  "\""+"รวมหน่วยกิต"+  "\""+",2:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+",3:" +  "0"+",4:" +  "\""+"ยังไม่ได้เลือกภาควิชา"+  "\""+"}]",
            Major: [],
           
          }
        this.handleChange=this.handleChange.bind(this)
        this.handleData=this.handleData.bind(this)
        this.major=this.major.bind(this)
        this.createTableCredit=this.createTableCredit.bind(this)
        this.handleChangeDelete=this.handleChangeDle.bind(this)
    }
    componentWillUpdate(){
        if (this.props.major !== this.state.Major){
                
            this.setState({Major : this.props.major},()=>{this.createTableCredit()})
            
            console.log(this.props.major)
        }  
    }
    
    handleChangeDle = (e) =>{
        
        if(e != ""){
            if(window.confirm('คุณต้องการจะลบวิชานี้หรือไม่')){
                var Url = "http://139.59.111.79:5000/remove/"+this.state.selectedOption+"d"+e
                var xmlHttp = new XMLHttpRequest()
                xmlHttp.open("GET",Url,false)
                xmlHttp.send(null)
                var data = xmlHttp.responseText.replace("{\"data\" : ", "").replace("}", "") 
                this.setState({selectedOption: data},()=>{this.handleData()})
            }
        }  
    }
    
    major = (e) =>{
        switch (e) {
            case "1":
                return "กลุ่มสาระอยู่ดีมีสุข"
                
            case "2":
                return "กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"
                
            case "3":
                return "กลุ่มสาระพลเมืองไทยและพลเมืองโลก"
                
            case "4":
                return "กลุ่มสาระภาษากับการสื่อสาร"
                
            case "5":
                return "กลุ่มสาระสุนทรียศาสตร์"
                
            }
        
    }

    handlePhase = (e1,e2) => {
        var sum = e1-e2
        console.log(e1)
        console.log(e2)
        if(sum>0){
            return "\""+"ขาดอีก "+sum+" หน่วยกิต"+"\""
        }
        else{
            if(e1<0){
                return "\""+"ระบบเก่า/ไม่มีข้อมูล"+"\""
            }
            else{
            return  "\""+"ลงทะเบียนครบแล้ว"+"\""}
        }
    }

    Check = (e) => {
        if (e<0){
            return  "ระบบเก่า/ไม่มีข้อมูล"
        }
        else{
            return e
        }

    }
    createTableCredit = () =>{
        var Program= this.state.program
        var Wellness = "{1:" +  "\""+"กลุ่มสาระอยู่ดีมีสุข"+  "\""+",2:" +  "\""+this.Check(this.state.Major[0])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][1]+ "\""+",4:" +  this.handlePhase(this.state.Major[0],eval(this.state.selectedOption)[0][1]) +  "},"
        var Entrepreneurship = "{1:" +  "\""+"กลุ่มสาระศาสตร์แห่งผู้ประกอบการ"+  "\""+",2:" +  "\""+this.Check(this.state.Major[1])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][2]+ "\""+",4:" +  this.handlePhase(this.state.Major[1],eval(this.state.selectedOption)[0][2])+"},"
        var Thai = "{1:" +  "\""+"กลุ่มสาระพลเมืองไทยและพลเมืองโลก"+  "\""+",2:" +  "\""+this.Check(this.state.Major[2])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][3]+ "\""+",4:" +  this.handlePhase(this.state.Major[2],eval(this.state.selectedOption)[0][3])+"},"
        var Language = "{1:" +  "\""+"กลุ่มสาระภาษากับการสื่อสาร"+  "\""+",2:" +  "\""+this.Check(this.state.Major[3])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][4]+ "\""+",4:" +  this.handlePhase(this.state.Major[3],eval(this.state.selectedOption)[0][4])+"},"
        var Aesthetics = "{1:" +  "\""+"กลุ่มสาระสุนทรียศาสตร์"+  "\""+",2:" +  "\""+this.Check(this.state.Major[4])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][5]+ "\""+",4:" +  this.handlePhase(this.state.Major[4],eval(this.state.selectedOption)[0][5])+"},"
        var All = "{1:" +  "\""+"รวมหน่วยกิต"+  "\""+",2:" +  "\""+this.Check(this.state.Major[0]+this.state.Major[1]+this.state.Major[2]+this.state.Major[3])+  "\""+",3:" +  "\""+eval(this.state.selectedOption)[0][0]+ "\""+",4:" +  this.handlePhase(this.state.Major[0]+this.state.Major[1]+this.state.Major[2]+this.state.Major[3],eval(this.state.selectedOption)[0][0])+"}"
        this.setState({programTable: "["+Wellness+Entrepreneurship+Thai+Language+Aesthetics+All+"]"})
    }
    handleData = () =>{
        var i
        var selected = eval(this.state.selectedOption)
        var newTablej = ""
        var  newTablei ="" 
        var len = selected.length
        
        for (i = 1; i<len;i++){
            var j
            var len1 = selected[i].length
            
            for(j=0; j< len1;j++){
                
                var sub = selected[i][j]
                
                var subject = ",{subject:" + "\""+ sub+" "+ MyJson_th[sub][1] +" ("+ this.major(MyJson[sub][0]) + ")\""
                var credit = ",credit:" + "\""+ MyJson[sub][3] + "(" + MyJson[sub][4] + ")" + "\""
                var by = ",by:"+ "\"" + MyJson_th[sub][3]+ "\""+"}"
                
                newTablej  = newTablej+subject+credit+by
            }
            
            newTablei=newTablei+newTablej
            newTablej=""
            
        }
        this.setState({table : "["+newTablei+"]"})
        this.createTableCredit()
        
        
    }

    handleChange = (e) => {
        if (this.props.major==""){
            alert("กรุณาเลือกภาควิชาก่อนๆ")
        }
        else if (this.state.selectedOption.indexOf(e.value) == -1) {
            this.setState({wordS : e.label})
            var Url = "http://139.59.111.79:5000/add/"+this.state.selectedOption+"a"+e.value 
            axios.get(Url)
            .then(res =>{
            this.setState({selectedOption: res.data.replace("{\"data\" : ", "").replace("}", "") })
            this.handleData()   
            })
            
        }else{
            alert("วิชานี้ถูกเลือกแล้ว")
        }
    }
    render(){
        const options = [
            { value: '01175111', label: '01175111 กรีฑาลู่-ลาน เพื่อสุขภาพ' },
{ value: '01175112', label: '01175112 แบดมินตันเพื่อสุขภาพ' },
{ value: '01175113', label: '01175113 เทนนิสเพื่อสุขภาพ' },
{ value: '01175114', label: '01175114 เทเบิลเทนนิสเพื่อสุขภาพ' },
{ value: '01175115', label: '01175115 ฝึกสมาธิด้วยกิจกรรมยิงปืน' },
{ value: '01175117', label: '01175117 ฝึกสมาธิด้วยกิจกรรมยิงธนู' },
{ value: '01175121', label: '01175121 บาสเกตบอลเพื่อสุขภาพ' },
{ value: '01175122', label: '01175122 ฟุตบอลเพื่อสุขภาพ' },
{ value: '01175123', label: '01175123 วอลเลย์บอลเพื่อสุขภาพ' },
{ value: '01175124', label: '01175124 แฮนด์บอลเพื่อสุขภาพ' },
{ value: '01175125', label: '01175125 ซอฟท์บอลเพื่อสุขภาพ' },
{ value: '01175126', label: '01175126 ตะกร้อเพื่อสุขภาพ' },
{ value: '01175127', label: '01175127 ฮอกกี้เพื่อสุขภาพ' },
{ value: '01175128', label: '01175128 รักบี้ฟุตบอลเพื่อสุขภาพ' },
{ value: '01175129', label: '01175129 ฟุตซอลเพื่อสุขภาพ' },
{ value: '01175131', label: '01175131 ว่ายน้ำเพื่อสุขภาพ' },
{ value: '01175133', label: '01175133 กระโดดน้ำ' },
{ value: '01175134', label: '01175134 โปโลน้ำ' },
{ value: '01175141', label: '01175141 การเต้นแอโรบิกเพื่อสุขภาพ' },
{ value: '01175142', label: '01175142 การเต้นรำพื้นเมืองตามวัฒนธรรมท้องถิ่นเพื่อสุขภาพ' },
{ value: '01175143', label: '01175143 การเต้นลีลาศเพื่อสุขภาพ' },
{ value: '01175144', label: '01175144 รำไทยเพื่อสุขภาพ' },
{ value: '01175151', label: '01175151 ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบไทย' },
{ value: '01175152', label: '01175152 ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบสากล' },
{ value: '01175153', label: '01175153 ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยไทย' },
{ value: '01175154', label: '01175154 ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยสากล' },
{ value: '01175155', label: '01175155 ศิลปะการป้องกันตัวและการต่อสู้ด้วยยูโด' },
{ value: '01175156', label: '01175156 ศิลปะการป้องกันตัวและการต่อสู้ด้วยไอกิโด' },
{ value: '01175157', label: '01175157 ศิลปะการป้องกันตัวและการต่อสู้ด้วยกระบี่กระบอง' },
{ value: '01175159', label: '01175159 ศิลปะการป้องกันตัวและการต่อสู้ด้วยคาราเต้' },
{ value: '01175161', label: '01175161 ฝึกสมองด้วยการเล่นบริดจ์' },
{ value: '01175162', label: '01175162 โบว์ลิ่งเพื่อสุขภาพ' },
{ value: '01175163', label: '01175163 กอล์ฟเพื่อสุขภาพ' },
{ value: '01175164', label: '01175164 จักรยานเพื่อสุขภาพ' },
{ value: '01175165', label: '01175165 การฝึกด้วยน้ำหนักเพื่อสุขภาพ' },
{ value: '01175166', label: '01175166 ศิลปะการป้องกันตัวและการต่อสู้ด้วยเทควันโด' },
{ value: '01175168', label: '01175168 การวิ่งเหยาะเพื่อสุขภาพ' },
{ value: '01175169', label: '01175169 การออกกาลังกายเพื่อพัฒนาสุขภาพแบบองค์รวม' },
{ value: '03768111', label: '03768111 เปตอง' },
{ value: '03768112', label: '03768112 การฝึกโดยการใช้น้ำหนัก ' },
{ value: '03768121', label: '03768121 บาสเกตบอล' },
{ value: '03768141', label: '03768141 นาฏศิลป์และลีลาศ' },
{ value: '03768151', label: '03768151 กระบี่กระบอง' },
{ value: '01173151', label: '01173151 เอดส์ศึกษา' },
{ value: '01174231', label: '01174231 นันทนาการเบื้องต้น1' },
{ value: '01387101', label: '01387101 ศิลปะการอยู่ร่วมกับผู้อื่น' },
{ value: '01387103', label: '01387103 ปรัชญาเศรษฐกิจพอเพียงกับพุทธศาสนา' },
{ value: '01459101', label: '01459101 จิตวิทยาเพื่อชีวิตสมัยใหม่' },
{ value: '01459102', label: '01459102 จิตวิทยากับความหลากหลายของมนุษย์' },
{ value: '01999011', label: '01999011 อาหารเพื่อมนุษยชาติ' },
{ value: '01999012', label: '01999012 สุขภาพเพื่อชีวิต' },
{ value: '01999033', label: '01999033 ศิลปะการดำเนินชีวิต' },
{ value: '01999036', label: '01999036 ความสุขในพลวัตของชีวิต' },
{ value: '01999048', label: '01999048 นวัตกรรมเพื่อสิ่งแวดล้อมและสุขภาวะ' },
{ value: '01999213', label: '01999213 สิ่งแวดล้อม เทคโนโลยี และชีวิต' },
{ value: '02032303', label: '02032303 การเกษตรกับคุณภาพชีวิตที่ดี' },
{ value: '02999044', label: '02999044 เศรษฐกิจพอเพียงเพื่อการดำรงชีวิต' },
{ value: '02999045', label: '02999045 การเพิ่มคุณค่าชีวิตด้วยวิถีชุมชนชนบท' },
{ value: '04401112', label: '04401112 บุคลิกภาพและมารยาททางสังคมสาหรับการบริการชุมชน' },
{ value: '04804311', label: '04804311 ปรัชญาเศรษฐกิจพอเพียง' },
{ value: '01005101', label: '01005101 เทคโนโลยีเกษตรสมัยใหม่' },
{ value: '01132101', label: '01132101 ผู้ประกอบการรุ่นใหม่' },
{ value: '01200101', label: '01200101 การคิดเชิงนวัตกรรม' },
{ value: '01999041', label: '01999041 เศรษฐศาสตร์เพื่อการดำเนินชีวิตที่ดี' },
{ value: '01999043', label: '01999043 การคิดสร้างสรรค์เพื่อการจัดการคุณค่า' },
{ value: '02717011', label: '02717011 ตนและการพัฒนาตน' },
{ value: '03600014', label: '03600014 การแก้ปัญหาเชิงสร้างสรรค์และทักษะการคิดเชิงวิพากษ์' },
{ value: '03757123', label: '03757123 คณิตศาสตร์สำหรับธุรกิจ' },
{ value: '01999111', label: '01999111 ศาสตร์แห่งแผ่นดิน' },
{ value: '01001317', label: '01001317 พระมหากษัตริย์และผู้นำประเทศกับการพัฒนาภาคการเกษตร' },
{ value: '01015202', label: '01015202 เกษตรวิถีไทย' },
{ value: '01174122', label: '01174122 การเรียนรู้เชิงนันทนาการโดยการเดินทางในต่างประเทศแบบประหยัด' },
{ value: '01350101', label: '01350101 วิถีชีวิตและวัฒนธรรมในอาเซียน' },
{ value: '01387104', label: '01387104 ปรัชญาและศาสนาในประเทศอาเซียน' },
{ value: '01390102', label: '01390102 การท่องเที่ยวเชิงสร้างสรรค์' },
{ value: '01450101', label: '01450101 สังคมไทยกับประชาคมอาเซียนในโลกปัจจุบัน' },
{ value: '01455101', label: '01455101 การเมืองโลกในชีวิตประจำวัน' },
{ value: '01460101', label: '01460101 สังคมและวัฒนธรรมไทยร่วมสมัย' },
{ value: '01999031', label: '01999031 มรดกอารยธรรมโลก' },
{ value: '01999032', label: '01999032 ไทยศึกษา' },
{ value: '01999046', label: '01999046 การพัฒนาความมั่นคงแห่งชาติ' },
{ value: '01999047', label: '01999047 การทหารเพื่อพัฒนาประเทศ' },
{ value: '01999141', label: '01999141 มนุษย์กับสังคม' },
{ value: '02999042', label: '02999042 การพัฒนานิสิต' },
{ value: '02999144', label: '02999144 ทักษะชีวิตการเป็นนิสิตในมหาวิทยาลัย' },
{ value: '02999147', label: '02999147 ไทยในพลวัตอาเซียน' },
{ value: '03751112', label: '03751112 สังคมและการเมือง' },
{ value: '04804115', label: '04804115 จิตอาสาเพื่อพัฒนาชุมชน' },
{ value: '01361102', label: '01361102 การเขียนภาษาไทยเชิงปฏิบัติ' },
{ value: '01361222', label: '01361222 การอ่านภาษาไทยเชิงวิจารณ์' },
{ value: '02701011', label: '02701011 การใช้ภาษาไทยเพื่อธุรกิจ วิทยาศาสตร์และเทคโนโลยี' },
{ value: '01999021', label: '01999021 ภาษาไทยเพื่อการสื่อสาร' },
{ value: '01354311', label: '01354311 ภาษาเขมร l' },
{ value: '01354312', label: '01354312 ภาษาเขมร ll' },
{ value: '01354411', label: '01354411 ภาษาเขมร lll' },
{ value: '01355111', label: '01355111 ภาษาอังกฤษพื้นฐาน l' },
{ value: '01355112', label: '01355112 ภาษาอังกฤษพื้นฐาน ll' },
{ value: '01355113', label: '01355113 ภาษาอังกฤษพื้นฐาน lll' },
{ value: '01355114', label: '01355114 ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ l' },
{ value: '01355115', label: '01355115 ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ ll' },
{ value: '01355201', label: '01355201 การอ่านภาษาอังกฤษเบื้องต้น' },
{ value: '01355202', label: '01355202 การเขียนภาษาอังกฤษเบื้องต้น' },
{ value: '01355203', label: '01355203 โครงสร้างภาษาอังกฤษเบื้องต้น' },
{ value: '01355204', label: '01355204 การฟัง-การพูดภาษาอังกฤษเบื้องต้น' },
{ value: '01355205', label: '01355205 การอ่านภาษาอังกฤษด้านสื่อมวลชน' },
{ value: '01355206', label: '01355206 อังกฤษวิชาการ' },
{ value: '01355207', label: '01355207 การเขียนตอบโต้ภาษาอังกฤษ' },
{ value: '01355208', label: '01355208 ภาษาอังกฤษจากเพลง' },
{ value: '01355209', label: '01355209 ภาษาอังกฤษเพื่อการสื่อสารในงานอาชีพ' },
{ value: '01355302', label: '01355302 การเขียนรายงานภาษาอังกฤษ' },
{ value: '01355303', label: '01355303 ภาษาอังกฤษเพื่อการสมัครงาน' },
{ value: '01356101', label: '01356101 ภาษาฝรั่งเศสเบื้องต้น l' },
{ value: '01356102', label: '01356102 ภาษาฝรั่งเศสเบื้องต้น ll' },
{ value: '01356103', label: '01356103 ภาษาฝรั่งเศสเบื้องต้น lll' },
{ value: '01356104', label: '01356104 ภาษาฝรั่งเศสเบื้องต้น lV' },
{ value: '01357111', label: '01357111 ภาษาเยอรมันเบื้องต้น l' },
{ value: '01357112', label: '01357112 ภาษาเยอรมันเบื้องต้น ll' },
{ value: '01357113', label: '01357113 ภาษาเยอรมันเบื้องต้น lll' },
{ value: '01357114', label: '01357114 ภาษาเยอรมันเบื้องต้น lV' },
{ value: '01358101', label: '01358101 ภาษาญี่ปุ่นเบื้องต้น l' },
{ value: '01358102', label: '01358102 ภาษาญี่ปุ่นเบื้องต้น ll' },
{ value: '01358103', label: '01358103 ภาษาญี่ปุ่นเบื้องต้น lll' },
{ value: '01358104', label: '01358104 ภาษาญี่ปุ่นเบื้องต้น lV' },
{ value: '01362101', label: '01362101 ภาษาจีน l' },
{ value: '01362102', label: '01362102 ภาษาจีน ll' },
{ value: '01362103', label: '01362103 ภาษาจีน lll' },
{ value: '01362104', label: '01362104 ภาษาจีน lV' },
{ value: '01362105', label: '01362105 ภาษาจีน V' },
{ value: '01367311', label: '01367311 ภาษาพม่า l' },
{ value: '01367312', label: '01367312 ภาษาพม่า ll' },
{ value: '01367411', label: '01367411 ภาษาพม่า lll' },
{ value: '01395101', label: '01395101 ภาษาเกาหลีเพื่อการศึกษา l' },
{ value: '01395102', label: '01395102 ภาษาเกาหลีเพื่อการศึกษา ll' },
{ value: '01395103', label: '01395103 ภาษาเกาหลีเพื่อการศึกษา lll' },
{ value: '01395104', label: '01395104 ภาษาเกาหลีเพื่อการศึกษา lV' },
{ value: '01395105', label: '01395105 การอ่านและรายงานภาษาเกาหลี' },
{ value: '01398101', label: '01398101 ภาษามลายูเพื่อการสื่อสาร l' },
{ value: '01398102', label: '01398102 ภาษามลายูเพื่อการสื่อสาร ll' },
{ value: '01398103', label: '01398103 ภาษามลายูเพื่อการสื่อสาร lll' },
{ value: '01398104', label: '01398104 ภาษามลายูเพื่อการสื่อสาร lV' },
{ value: '01398105', label: '01398105 การอ่านภาษามลายู' },
{ value: '01398106', label: '01398106 การฟัง-พูดภาษามลายู' },
{ value: '01399101', label: '01399101 ภาษาเวียดนามเพื่อการสื่อสาร l' },
{ value: '01399102', label: '01399102 ภาษาเวียดนามเพื่อการสื่อสาร ll' },
{ value: '01399103', label: '01399103 ภาษาเวียดนามเพื่อการสื่อสาร lll' },
{ value: '01399104', label: '01399104 ภาษาเวียดนามเพื่อการสื่อสาร lV' },
{ value: '01399105', label: '01399105 การอ่านภาษาเวียดนาม' },
{ value: '01399106', label: '01399106 การฟัง-พูดภาษาเวียดนาม' },
{ value: '02724011', label: '02724011 การสื่อสารระหว่างวัฒนธรรม' },
{ value: '03754111', label: '03754111 ภาษาอังกฤษ l' },
{ value: '03754112', label: '03754112 ภาษาอังกฤษ lll' },
{ value: '03754113', label: '03754113 ภาษาอังกฤษ lll' },
{ value: '03754271', label: '03754271 ภาษาอังกฤษในงานอาชีพ' },
{ value: '01371111', label: '01371111 สื่อสารสนเทศ' },
{ value: '01418111', label: '01418111 การใช้งานคอมพิวเตอร์' },
{ value: '01999013', label: '01999013 การจัดการสารสนเทศยุคใหม่ในชีวิตประจำวัน' },
{ value: '02729102', label: '02729102 การประยุกต์คอมพิวเตอร์ในชีวิตประจำวัน' },
{ value: '03752111', label: '03752111 ทรัพยากรสารสนเทศเพื่อการค้นคว้า' },
{ value: '01007101', label: '01007101 พืชสวนเพื่อคุณภาพชีวิตและสิ่งแวดล้อม' },
{ value: '01009102', label: '01009102 ทรัพยากรการเกษตรและสิ่งแวดล้อม' },
{ value: '01240011', label: '01240011 การออกแบบในชีวิตประจำวัน' },
{ value: '01255101', label: '01255101 มนุษย์กับทะเล' },
{ value: '01376101', label: '01376101 วรรณกรรมกับชีวิต' },
{ value: '01420201', label: '01420201 อัญมณีและเครื่องประดับ' },
{ value: '01999034', label: '01999034 ศิลปวิจักษณ์' },
{ value: '01999035', label: '01999035 วัฒนธรรมดนตรีกับชีวิต' },
{ value: '02708102', label: '02708102 วรรณกรรมกับวิทยาศาสตร์' },
{ value: '03600012', label: '03600012 เทคโนโลยีสีเขียว' },
{ value: '03751111', label: '03751111 มนุษย์กับสิ่งแวดล้อม'  , clearableValue: false },
        ];
    
    let { selectedOption } = this.state
    const value = selectedOption && selectedOption.value;
		return(
        <div >
            <p/>
            <h3 className="subject-search">เลือกวิชาที่ต้องการลงทะเบียน</h3>
                <div className="Search">
                <Select
                    name="subject"
                    autosize={false}
                    value={value}
                    placeholder={this.state.wordS}
                    onChange={this.handleChange}
                    options={options}
                    style={{ fontSize: 15 }}
                />
                </div>
                <br/>
                
                <Table table={this.state.table} selectedOption={this.state.selectedOption} programTable={this.state.programTable} del={this.handleChangeDelete} major={this.props.major}/> 
                
		</div>
        );
    }
}

export default Search;
