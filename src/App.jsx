import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Category from './Components/Category/Category'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import AuthContext from './Contexts/AuthContext'
import Guard from './Components/Guard/Guard'
import NotFound from './Components/NotFound/NotFound'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContext from './Contexts/CartContext'
import { Toaster } from 'react-hot-toast';
import Order from './Components/order/order'
import Brands from './Components/Brands/Brands'
import Wishlist from './Components/Wishlist/Wishlist'
import WishlistContext from './Contexts/WishlistContext'
import ForgPassword from './Components/ForgPassword/ForgPassword'
import ResetPasswordContext from './Contexts/ResetPasswordContext'


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
