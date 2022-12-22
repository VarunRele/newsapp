import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, date, source } = props

    return (
      <div className="card my-2">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%", zIndex: '1'}}>
          { source }
        </span>
            <img src={imageUrl} className="card-img-top" alt="..." style={{maxWidth: "100%", height: "232px"}} />
            <div className="card-body">
            <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-muted">Published on { new Date(date).toLocaleString() }</small></p>
          <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-primary">More detail</a>
          
            </div>
        </div>
    )
}

export default NewsItem