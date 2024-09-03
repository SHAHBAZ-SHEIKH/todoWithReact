import { useState, useEffect } from "react";
import ListItem from "../listpage/ListItem";
import "./form.css"
import { db, collection, getDocs, addDoc, deleteDoc, query,updateDoc } from "../../../firebase";
import { doc } from "firebase/firestore";




function Form() {
    const [task, setTask] = useState("")
    const [taskList, setTaskList] = useState([])
    const [flag, setFlag] = useState(false)
    const [updateIndex, setUpdateIndex] = useState(0)
    const [docIds,setDocsIds] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const q = query(collection(db, "tasksTodo"));

                const querySnapshot = await getDocs(q);
                let getData= querySnapshot.docs.map((doc)=>doc.data().tasks);
                let ids = querySnapshot.docs.map((doc)=>doc.id)
                console.log(getData)
                setTaskList(getData)
                setDocsIds(ids)
            } catch (error) {
                console.log("Error yeh hai", error)

            }

        }
        fetchTasks()
    }, [])

    const deleteHandler = async(index) => {
        console.log("index", index)
        try {
            const docId = docIds[index];
            await deleteDoc(doc(db, "tasksTodo", docId));
            const updatedTaskList = taskList.filter((myValue, i) => {
                if(index !==i){
                    return myValue
                }
            });
            const updatedDocIds = docIds.filter((myid, i) => {
                if(index !==i){
                    return myid
                }
            });
            setTaskList(updatedTaskList);
            setDocsIds(updatedDocIds);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }

    }

    const updateHandler = (itemValue, index) => {
        console.log("itemValue", itemValue,index)
        setTask(itemValue)
        setUpdateIndex(index)
        setFlag(true)

    }



    const addHandler = async () => {
        try {

            const newTask = { tasks: task }
            let docRef = await addDoc(collection(db, "tasksTodo"), newTask);
            setTaskList([...taskList, task])
            setTask("")
            console.log(docIds)

            console.log("Document written with ID: ", docRef.id);
        }

        catch (e) {
            console.error("Error adding document: ", e);

        }
        console.log(taskList)
    }

    const ctaUpdateHandler = async () => {
        if (updateIndex >= 0 && updateIndex < docIds.length) {
            try {
                const docId = docIds[updateIndex];
                const updatedTask = { tasks: task };
    
                await updateDoc(doc(db, "tasksTodo", docId), updatedTask);
    
                let updatedValue = taskList.map((item, index) => {
                    if (updateIndex === index) {
                        return task;
                    } else {
                        return item;
                    }
                });
    
                setTaskList(updatedValue);
                setTask('');
                setFlag(false);
                console.log("updateIndex:", updateIndex);
                console.log("docIds:", docIds);
                console.log("taskList:", taskList);
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        } else {
            console.error("Invalid update index or document ID");
            console.log("updateIndex:", updateIndex);
            console.log("docIds:", docIds);
            console.log("taskList:", taskList);
        }
    };
    
    





    return (
        <div className="mycontainer">
            <div className="formValue">
                <div className="inputdiv">
                    <div className="formMain">
                        <input placeholder="Enter todos" value={task} onChange={(e) => setTask(e.target.value)} />
                    </div>
                    <div className="addBtn">
                        {
                            flag ? <button onClick={ctaUpdateHandler}>Update</button> : <button onClick={addHandler}>Add Task</button>
                        }
                    </div>
                </div>
                <div className="list">
                    {
                        taskList.map((item, index) => {
                            return <ListItem key={index} task={item} index={index} deleteHandler={deleteHandler} updateHandler={updateHandler} />
                        })
                    }


                </div>
            </div>




        </div>
    )

}


export default Form;