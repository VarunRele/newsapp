import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const NewsPage = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const getData = async (a) => {

        props.loadState(10)

        setLoading(true)
        
        let url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=038e9590-c0f9-4f09-8183-22e10ebff476&country=in&keyword=${props.category}&resultType=articles&articlesPage=${currentPage + a}&articlesCount=${props.articlesCount}`
        
        let data = await fetch(url)
        props.loadState(30)
        let parsedData = await data.json()
        props.loadState(70)

        data = parsedData.articles.results
        
        setArticles(data)
        setTotalPages(parsedData.articles.pages)
        setLoading(false)
        props.loadState(100)
    }

    useEffect(() => { 
        getData(0)
        // eslint-disable-next-line
    }, [])
    

    // const handlePreviousClick = async () => {
    //     await getData(-1)
    //     setCurrentPage(currentPage - 1)
    // }

    // const handleNextClick = async (event) => {
    //     if (currentPage + 1 > totalPages) {
    //         event.target.disabled = true
    //     } else {
    //         await getData(1)
    //         setCurrentPage(currentPage + 1)
    //         event.target.disabled = false
    //     }
    // }

    const fetchMoreData = async () => {
        let url = `https://eventregistry.org/api/v1/article/getArticles?apiKey=038e9590-c0f9-4f09-8183-22e10ebff476&country=in&keyword=${props.category}&resultType=articles&articlesPage=${currentPage + 1}&articlesCount=${props.articlesCount}`
        
        let data = await fetch(url)
        let parsedData = await data.json()

        data = parsedData.articles.results
        
        setArticles(articles.concat(data))
        setCurrentPage(currentPage + 1)
      };
    

    return (
        <>
            <h1 style={{marginTop: "64px", marginBottom: "-30px"}}>{props.category[0].toUpperCase() + props.category.slice(1)} News</h1>
            {loading && <Spinner />}
            
                
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={currentPage < totalPages}
                    loader={<Spinner />}
                >
                <div className="container my-5 d-flex justify-content-between">
                    
                    <div className="row">    
                    {articles.map((element) => {
                        let title = element.title
                        let description = element.body
                        if (title !== null && title.length > 24) {
                            title = title.slice(0, 24)
                        }
                        if (description !== null && description.length > 88) {
                            description = description.slice(0, 88)
                        }
                        return <div className="col col-lg-4" key={element.uri}>
                            <NewsItem title={title} description={description} imageUrl={element.image?element.image:"https://i.stack.imgur.com/l60Hf.png"} newsUrl={element.url} date={element.dateTimePub} source={element.source.uri} />
                        </div>
                    })}
                   </div>     
                    </div>
                </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.currentPage<=1} className="btn btn-dark" onClick={this.handlePreviousClick}>Previous</button>
                <p>{ this.state.currentPage }</p>
                <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next</button>
            </div> */}
        </>
    )
}

NewsPage.defaultProps = {
    articlesCount: 5,
    category: 'cricket'
}

NewsPage.propTypes = {
    articlesCount: PropTypes.number,
    category: PropTypes.string
}

export default NewsPage