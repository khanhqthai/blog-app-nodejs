import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import CKEditor from 'ckeditor4-react';


class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: ''
    }

    this.handleChangeField = this.handleChangeField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    const { onSubmit } = this.props;
    const { title, body, author } = this.state;

    return axios.post('http://localhost:8000/api/articles', {
      title,
      body,
      author,
    })
      .then((res) => onSubmit(res.data));
  }

  handleChangeField(key, event) {
    this.setState({
      [key]: event.target.value,
    });
  }

  handleTextEditorField(key,event){
    this.setState({
      [key]: event.editor.getData(),
    });
  }

  render() {
    const { title, body, author } = this.state;

    return (
      <div className="col-12 col-lg-8 offset-lg-2">
        <input
          onChange={(ev) => this.handleChangeField('title', ev)}
          value={title}
          className="form-control my-3"
          placeholder="Article Title"
        />

        <CKEditor
          onChange={(ev) => this.handleTextEditorField('body', ev)}
          className="form-control my-3"
          placeholder="Article Body"
          data="<p>Article Body</p>"
        />

        <input
          onChange={(ev) => this.handleChangeField('author', ev)}
          value={author}
          className="form-control my-3"
          placeholder="Article Author"
        />

        <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({ type: 'SUBMIT_ARTICLE', data }),
});

export default connect(null, mapDispatchToProps)(Form);