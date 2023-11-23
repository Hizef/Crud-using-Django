import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostCreate from './components/PostCreate';
import PostUpdate from './components/PostUpdate';
import PostDelete from './components/PostDelete';

function App() {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch('/api/posts/');
    const data = await response.json();
    setPosts(data);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = async () => {
    const response = await fetch('/api/posts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      handleClose();
      fetchPosts();
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>CRUD 게시판</h1>
          <Button variant="primary" onClick={handleShow}>
            글 작성
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Router>
            <Route path="/" exact component={PostList} />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/post/new" component={PostCreate} />
            <Route path="/post/:id/edit" component={PostUpdate} />
            {/* 추가적인 Route를 필요에 따라 설정 */}
          </Router>
          <ul>
            {posts.map(post => (
              <li key={post.id}>
                <a href={`/post/${post.id}/`}>{post.title}</a>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요."
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="내용을 입력하세요."
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default App;