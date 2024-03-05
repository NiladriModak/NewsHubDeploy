import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spin from "./Spin";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);

  const NewsUpdate = async () => {
    // console.log("yes")
    props.setProgress(0);
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2603d6061e1043099abf75984bb78f6c&page=${page}&pageSize=5`
    );
    setLoading(true);
    props.setProgress(25);
    let parseData = await data.json();
    props.setProgress(50);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    NewsUpdate();
  }, []);

  // handleNextClick = async (event) => {
  //   this.setState({
  //     page: this.state.page + 1
  //   })
  //   this.NewsUpdate();
  // }
  // handlePrevClick = async (event) => {
  //   this.setState({
  //     page: this.state.page - 1
  //   })
  //   this.NewsUpdate();
  // }
  const fetchMoreData = async () => {
    setLoading(true);
    let data = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&category=${
        props.category
      }&apiKey=2603d6061e1043099abf75984bb78f6c&page=${page + 1}&pageSize=5`
    );
    setLoading(true);
    setPage(page + 1);
    let parseData = await data.json();
    await setArticles(articles.concat(parseData.articles));
    await setTotalResults(parseData.totalResults);

    setLoading(false);
  };
  return (
    <>
      <h2 className="text-center" style={{ marginTop: "4%" }}>
        Top headlines of {props.category !== "" ? props.category : "Today"}
      </h2>
      {loading && <Spin />}
      {articles && (
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spin />}
        >
          <div className="container my-4">
            <div className="row my-3">
              {articles &&
                articles.map((element) => {
                  return (
                    <div className="col-md-4 my-2" key={element.url}>
                      <NewsItems
                        title={element.title}
                        description={element.description}
                        img={element.urlToImage ? element.urlToImage : null}
                        newsurl={element.url}
                        date={element.publishedAt}
                        source={element.source.name}
                        author={element.author}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default News;
