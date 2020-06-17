import React , {useState , useEffect}  from 'react';
import './App.css';
import Landing from './component/Landing'
import Modal from './component/Model';
import axios from 'axios';
import Pagination from './component/Pagination';

//<img src={require('../images/' + this.props.images)} className="img-fluid" alt = "anh chu de"/>
function App() {
  const [details , setDetails] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [updateItem , setupdateItem] = useState({});


  const [pagination , setPagination] = useState({
    totalRecord : 16,
    page : 0 ,
    size : 8
  })

  const [filters , setFilters] = useState({
    page : 0 ,
    size : 8
  })

  function toggle() {
    setupdateItem({})
    setIsShowing(!isShowing);
  }

  const toggleId = (id) => {
    const objUpdate = [...details].filter(value => value.id === id)[0]
    setupdateItem(objUpdate)
    setIsShowing(!isShowing)
  }

 

  useEffect(() => {
    async function getDataFromApi() {
      try {
        const {size , page} = filters
        const res = await axios.get(`http://localhost:8080/api/book?page=${page}&size=${size}`)
        const {data} = res;
        //setPagination({...pagination , totalRecord : data.length})
        setDetails(data);
        
      } catch (error) {
        console.log("Message Error : " , error)
      }
    }
    getDataFromApi()
  }, [filters])
 
  // useEffect(() => {
  //   async function getDataFromApi() {
  //     try {
  //       const res = await axios.get(`http://localhost:8080/api/book/all`)
  //       const {data} = res;
  //       const totalRecord = data.length;
  //       setPagination(pagination => ({...pagination , totalRecord}))
  //       setDetails(data);
        
  //     } catch (error) {
  //       console.log("Message Error : " , error)
  //     }
  //   }
  //   getDataFromApi()
  // } , [pagination])


  const addItems = (obj , file , id) => {
    const cloneDetails = [...details]
    const formData = new FormData();
    formData.append('file' , file );

    //flag
    let flag = false;
    cloneDetails.map((value) => {
      if(value.id === obj.id) {
        flag = true;
        return true;
      }
      return false;
    })   
    if(flag) {
      cloneDetails.forEach((value , key) => {
        if(value.id === obj.id){
          value.name = obj.name;
          value.author = obj.author;
          value.imgUrl = obj.imgUrl
          console.log("oke")
          axios.put('http://localhost:8080/api/book' , formData , {
          params : {
            id : obj.id ,
            author : obj.author ,
            name : obj.name 
           }
          })
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err))
        }
      })
      setDetails(cloneDetails)
      console.log(cloneDetails)
     
    }
    else
    {
      axios.post('http://localhost:8080/api/book' , formData , {
        params : {
          author : obj.author ,
          name : obj.name 
        }
      })
      .then(res => {
        obj.id = res.data.id
        setDetails([...details , obj])
      })
    }
   
  }

  const delItems = async (id) => {
    console.log(details)
    try {
      const res = axios.delete(`http://localhost:8080/api/book?id=${id}`)
      console.log(res.data)
      setDetails([...details].filter(item => item.id !== id))
    } catch (error) {
      console.log("Message Error : " , error)
    }
   
  }

  const onChangePagination = (newPage) => {
    console.log("ban dang o trang " , newPage)
    setFilters({...filters , page : newPage})  
    setPagination({...pagination , page : newPage})  
  }
  return (
    <div className="app">
      <div className="add-new-book">
        <button onClick={toggle}>Thêm mới sách + </button>
      </div><hr/>


      <div className="flex-container">
        <Modal
          updateItem = {updateItem}
          addItems = {addItems}
          isShowing={isShowing}
          hide={toggle}
        />
        <div className="one-row">
          {details.map((value , index) => (
            <Landing books = {value} index = {index} key = {value.id} delItems = {delItems} toggleId = {toggleId}></Landing>
          ))}
        </div>
      </div>
      
      <Pagination pagination = {pagination} onChangePagination = {onChangePagination}/>
    </div>
  );
}

export default App;
