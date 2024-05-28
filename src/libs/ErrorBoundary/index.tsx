import React from 'react';

interface ErrorBoundaryState {
  error?: Error;
  info?: {
    componentStack?: string;
  };
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  FallbackComponent?: React.ComponentType<ErrorBoundaryState>;
}

export class ErrorBoundary extends React.PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: undefined,
    info: undefined,
  };

  static getDerivedStateFromError(error?: Error) {
    return {
      error,
      info: { componentStack: error && error.stack },
    };
  }

  componentDidCatch(
    error: Error | undefined,
    info: { componentStack?: string | undefined },
  ) {
    console.error(error, info);
  }

  render() {
    const { FallbackComponent, children } = this.props;
    const { error, info } = this.state;

    if (error) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} info={info} />;
      }
      return null;
    }

    return children;
  }
}
