// .../src/components/MyComponent.js

import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  // 부트스트랩 전역 스타일

const MyComponent = () => {
  return (
    <div>
      <h1>Hello, React with Bootstrap!</h1>
      <Button variant="primary">Primary Button</Button>
    </div>
  );
};

export default MyComponent;