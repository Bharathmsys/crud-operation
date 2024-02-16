import React, { useEffect, useState } from 'react'
const userFunction = ()=>{
    const u = JSON.parse(localStorage.getItem("d"))
    if(u){
        return u
    } else {
       return []
    }
}
const Curd = () => {
    const [name,setName] = useState()
    const [lastName,setlastName] = useState()
    const [email,setEmail] = useState()
    const [number,setNumber] = useState()
    const [data,setData] = useState(userFunction())
    const [show,setShow] = useState(true)
    const [edits,setEdit] = useState()
    const [fdata,setFdata] = useState([])
    const id = Math.random()
    
    useEffect(()=>{
        localStorage.setItem("d",JSON.stringify(data))
    },[data])

    const a = (event)=>{
        setName(event.target.value)
    }
    const b = (event)=>{
        setlastName(event.target.value)
    }
    const c= (event)=>{
        setEmail(event.target.value)
    }
    const d= (event)=>{
        setNumber(event.target.value)
    }
    const add =()=>{
        const user = {
           id,name,lastName,email,number
        }
        setData([...data,user])
        setName("")
        setlastName("")
        setEmail("")
        setNumber("")
        let settings = {method:'POST',headers:{'content-type': 'application/json'
 },body:JSON.stringify(user)}
fetch("https://crudoperation-d8326-default-rtdb.firebaseio.com/user.json",settings)
}
    // localStorage.setItem("da",JSON.stringify(data))

   

    const update = ()=>{
        const userData = data.map((eachuser)=>{
            if(eachuser===edits){
                return{
                    name,lastName,email,number
                }
            }else {
                return  eachuser
            }
        })
        setData(userData)
        setShow(true)
        // setEdit(null)
        setName("")
        setlastName("")
setEmail("")
setNumber("")
   
    }

   


    useEffect(()=>{
fetch('https://crudoperation-d8326-default-rtdb.firebaseio.com/user.json',{method:"GET"}).then(res=>res.json()).then(data=>{
    console.log(data)
     let a = []
     for(let i in data){
        a.push(data[i])
    }
   setFdata(data) 
   console.log(fdata)
})
},[])
 const delet =(i)=>{
        data.splice(i,1)
     setData([...data])
     
}
const edit =(each)=>{
        setShow(false)
        setName(each.name)
        setlastName(each.lastName)
        setEmail(each.email)
        setNumber(each.number)
        setEdit(each)
    }
  return (
    <div>
    <form onSubmit={add} className='curd'>
      <input onChange={a} value={name} type="text" className='form-control' placeholder='Name' width="200px" required/>
      <input onChange={b} value={lastName} type="text" className='form-control' placeholder='LastName' required/>
      <input onChange={c} value={email} type="email" className='form-control' placeholder='email' required/>
      <input onChange={d} value={number} type="number" className='form-control' placeholder='Mobile Number' required/>
      {show?(<button type='submit' className='button'>Add</button>):
      (<button onClick={update}className='button'>Update</button>)}
      </form>
      
        {
        data.map((each,index)=>{
            return(
                <div>
                    <div>
                    <h4>Name : {each.name}</h4>
                    <h4>LastName : {each.lastName}</h4>
                    <h4>Email : {each.email}</h4>
                    <h4>Mobile No  : {each.number}</h4>
                    </div>
                    <div >
            <button onClick={()=>edit(each)} className='b1'>Edit</button>
            <button onClick={()=>delet(index)}className='b2'>Delete</button>
        </div>
        </div>
            )
        })}
        
      
    </div>
  )
}

export default Curd
