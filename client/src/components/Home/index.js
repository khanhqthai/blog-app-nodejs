import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { Form } from '../../components/Article';
class Home extends React.Component {
  componentDidMount() {
    const { onLoad } = this.props;

    axios('http://localhost:8000/api/articles')
      .then((res) => onLoad(res.data));
  }
  render() {
    const { articles } = this.props;

    return (
      <div className=" container">
        <div className="row pt-5">
          <div className=" col-12 col-lg-8 offset-lg-2">
            <h1 className="text-center blog-title">Little Bl🔥g of Mine</h1> 
          </div>
        </div>

  {/* <div className="row pt-5">
        <Form/>
        </div> */ }

        <div className="row pt-5">
          <div className=" col-12 col-lg-8 offset-lg-2">
            {articles.map((article) => {
              return (
                <div className="shadow-sm card my-3">
                  <div className="card-header">
                    {article.title}
                  </div>
                  <div className="card-body" dangerouslySetInnerHTML={{ __html: article.body }} >
               
                  </div>
                  <div className="card-footer" >
                    <i>{article.author}
                      <p className="float-right">
                        {new Date(article.createdAt).toLocaleDateString()}
                      </p>
                    </i>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.home.articles,
});

const mapDispatchToProps = dispatch => ({
  onLoad: data => dispatch({ type: 'HOME_PAGE_LOADED', data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);



