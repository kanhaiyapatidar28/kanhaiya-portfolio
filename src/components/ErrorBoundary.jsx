import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught 3D Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return null or a fallback to keep the rest of the app alive
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
