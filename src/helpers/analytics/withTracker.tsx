import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default <P extends RouteComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  const trackPage = (page: string) => {
    // window.gtag('event', 'page_view', {
    //   page_location: window.location.href,
    //   page_path: page,
    //   page_title: document.title,
    // });
  };

  return (props: P) => {
    useEffect(() => {
      trackPage(props.location.pathname);
      console.log('LOCATION', props.location.pathname)
    }, [props.location.pathname]);

    return <WrappedComponent {...props} />;
  };
};