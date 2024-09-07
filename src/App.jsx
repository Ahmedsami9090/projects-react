import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Category from './Components/Category/Category'
import ForgPassword from './Components/ForgPassword/ForgPassword'
import Guard from './Components/Guard/Guard'
import Home from './Components/Home/Home'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import Order from './Components/Order/Order'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Products from './Components/Products/Products'
import Register from './Components/Register/Register'
import Wishlist from './Components/Wishlist/Wishlist'
import AuthContext from './Contexts/AuthContext'
import CartContext from './Contexts/CartContext'
import ResetPasswordContext from './Contexts/ResetPasswordContext'
import WishlistContext from './Contexts/WishlistContext'


const myRouter = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: '', element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'home', element: <Guard><Home /></Guard> },
      { path: 'products', element: <Guard><Products /></Guard> },
      { path: 'category', element: <Guard><Category /></Guard> },
      { path: 'register', element: <Register /> },
      { path: 'cart', element: <Guard><Cart /></Guard> },
      { path: 'details/:id', element: <Guard><ProductDetails /></Guard> },
      { path: 'order/:id', element: <Guard><Order /></Guard> },
      { path: 'brands', element: <Guard><Brands /></Guard> },
      { path: 'wishlist', element: <Guard><Wishlist /></Guard> },
      { path: 'forgotPassword', element: <ForgPassword /> },
      {path: 'allorders', element:<Guard><Home /></Guard> },
      { path: '*', element: <NotFound /> },

    ]
  }
])

const myClient = new QueryClient();




function App() {


  return (
    <AuthContext>
      <QueryClientProvider client={myClient}>
        <CartContext>
          <WishlistContext>
            <ResetPasswordContext>
              <RouterProvider router={myRouter} />
              <Toaster />
            </ResetPasswordContext>
          </WishlistContext>
        </CartContext>
      </QueryClientProvider>
    </AuthContext>
  )
}

export default App
