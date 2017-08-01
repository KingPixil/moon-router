const setup = (instance, mode) => {
  let getPath = null;
  let navigate = null;
  let listener = null;

  if(mode === undefined) {
    // Setup Path Getter
    getPath = function() {
      let path = window.location.hash.slice(1);

      if(path.length === 0) {
        path = "/";
      }

      return path;
    }

    // Create navigation function
    navigate = function(route) {
      window.location.hash = route;
      run(instance, route);
    }

    // Add hash change listener
    window.addEventListener("hashchange", function() {
      instance.navigate(instance.getPath());
    });
  } else if(mode === "history") {
    // Setup Path Getter
    getPath = function() {
      let path = window.location.pathname.substring(instance.base.length);

      if(path.length === 0) {
        path = "/";
      }

      return path;
    }

    // Create navigation function
    navigate = function(route) {
      history.pushState(null, null, instance.base + route);
      run(instance, route);
    }

    // Create listener
    listener = function(route) {
      instance.navigate(route);
    }
  }

  const initPath = getPath();
  instance.current = {
    path: initPath,
    component: null
  };

  instance.getPath = getPath;
  instance.navigate = navigate;
  instance.listener = listener;

  navigate(initPath);
}
