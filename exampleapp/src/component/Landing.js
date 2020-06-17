import React  from 'react'
export default function Landing({books , delItems , toggleId}) {
    return (
        <React.Fragment>
            <div className="one-box">
                <img className="describe-book" src={"http://localhost:8080/" + books.imgUrl} alt="describe" />
                <p className="title"><b>Tilte</b> : {books.name}</p>
                <p className="author"><b>Author</b> : {books.author}</p>
                <div className="navigator">
                    <button onClick = {() => toggleId(books.id)} style = {{margin : "10px"}}>Sửa</button>
                    <button onClick = {() => delItems(books.id)}>Xóa</button>
                </div>
            </div>
        </React.Fragment>
    )
}
