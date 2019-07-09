import React from 'react';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    document.title = 'failed';
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
