import { Typography } from "@mui/material"
import { Link } from "react-router"

const navBar = () => {
  
  const linkStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
};

  return (<>
    <nav>
      <Link to='/' style={linkStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        </Link>

      <Link to='/about' style={linkStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          About
        </Typography>
        </Link>
      {/* //onClick={() => setIsShow(!isShow)} */}
      <Link to='/showAllRecipes' style={linkStyle}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* {isShow ? 'Hide Recipes' : 'Show All Recipes'} */}
          show
        </Typography>
      </Link>
    </nav>
  </>)
}
export default navBar