import React, { useEffect } from 'react'

const Login = () => {
    useEffect(() => {
        const query = window.location.search;
        const urlParams = new URLSearchParams(query);
        const codeParams = urlParams.get("code");
        console.log(codeParams,"from Login page")
      }, []);
    
  return (
    <div>
      <button>
        <a href="https://github.com/login/oauth/authorize?client_id=10266cb99310f2280fd5">
          {/* we can also write window.location.assign = "https://github.com/login/oauth/authorize?client_id=10266cb99310f2280fd5" */}
          SIGN IN WITH GITHUB
        </a>
      </button>
    </div>
  )
}

export default Login
