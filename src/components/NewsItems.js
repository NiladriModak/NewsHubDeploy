import React from 'react'

const NewsItems =(props)=> {
    let {title,description,img,newsurl,date,source,author} = props;
    return (
      <div >
        <div className="card" >
        <img src={img?img:"https://upload.wikimedia.org/wikipedia/commons/f/f0/Newshub_logo.svg"} className="card-img-top" alt="..."/>
        <div className="card-body">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"90%"}}>
            {source}
          </span>
          <h5 className="card-title">{title} </h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By-{author?author:"Unknown"} at {new Date(date).toGMTString()}</small></p>
          <a href={newsurl} target='__blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
      </div>
    )

}

export default NewsItems
