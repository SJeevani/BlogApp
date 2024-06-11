import './App.css';
import { createBrowserRouter,Navigate,RouterProvider } from 'react-router-dom';
import {lazy, Suspense} from 'react'
import RouteLayout from './components/RouteLayout'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import UserProfile from './components/user-profile/UserProfile';
import AuthorProfile from './components/author-profile/AuthorProfile'
import ErrorPage from './components/ErrorPage'
import Articles from './components/articles/Articles';
import ArticlesByAuthor from './components/articles-by-author/ArticlesByAuthor';
import Article from './components/article/Article';
// dynamic import of add article page(due to lazy loading)
const AddArticle=lazy(()=>import('./components/add-article/AddArticle'))

function App() {

  // create browser router object
  let router=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:'',
          element:<Home /> 
        },
        {
          path:'home',
          element:<Home/>
        },
        {
          path:'register',
          element:<Register/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'user-profile',
          element:<UserProfile/>,
          children:[
            {
              path:"articles",
              element:<Articles />
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles' />
            }
          ]
        },
        {
          path:'author-profile',
          element:<AuthorProfile/>,
          children:[
            {
              path:'new-article',
              element:<Suspense fallback="loading..."><AddArticle /></Suspense> 
            },
            {
              path:'articles-by-author/:author',
              element:<ArticlesByAuthor />,
             
            },
            {
              path:"article/:articleId",
              element:<Article />
            },
            {
              path:'',
              element:<Navigate to='articles-by-author/:author' />
            }
          ]
        }
      ]
    }
  ])

  return (
    <div>
      {/* provide browser routerobj to application */}
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
