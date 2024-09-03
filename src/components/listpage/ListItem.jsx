import './listItem.css'
function ListItem({task,index,deleteHandler,updateHandler}) {
    console.log(task)
    
    return (


        <div className="listValue">
            <div className="checkList">
                <input type="checkbox" />
            </div>
            <div className="listInput">
                <h5>{task}</h5>
            </div>
            <div className="listBtn">
                <button onClick={()=>updateHandler(task,index)}  className='editBtn'><i class="fa-regular fa-pen-to-square"></i></button>
                <button onClick={()=>deleteHandler(index)} className='deleteBtn'><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>



    )
}

export default ListItem;