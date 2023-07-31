import productModel from "./ProductsModel.js"

const products = [
    {
        name: 'Slim T-shirt',
        category: 'T-Shirts',
        image: '/images/P-1.jpg',
        price: 60,
        brand: 'H&M',
        rating: 4.5,
        numReviews: 10,
        countInstock:10,
        alias:"Slim T-shirt"
      },
      {
        name:'Suit',
        category:'Suits',
        image:'/images/P-2.jpg',
        price: 100,
        brand:'Armani',
        rating: 5,
        numReviews:10,
        countInstock:10,
        alias:"Suits"
      },
      {
        name:'Women Suit',
        category:'Suit',
        image:'/images/P-3.jpg',
        price:70,
        brand:'Armani',
        rating:4,
        numReviews:10,
        countInstock:10,
        alias:"New Suits"
      },
      {
        name:'Patns',
        category:'Patns',
        image:'/images/P-4.jpg',
        price:50,
        brand:'India',
        rating:3.5,
        numReviews:10,
        countInstock:10,
        alias:"Patns"
      },
      {
        name:'Kids Monsoon',
        category:'Kids',
        image:'/images/P-5.jpg',
        price:80,
        brand:'Nike',
        rating:4,
        numReviews:10,
        countInstock:10,
        alias:"Kids"
      },
      {
        name:'Kids Summer',
        category:'Kids',
        image:'/images/P-6.jpg',
        price:60,
        brand:"Levis",
        rating:2.5,
        numReviews:10,
        countInstock:10,
        alias:"New kids"
      }
]

class ProductController{

 async insertMany (req,res) {
    try {
      const result = await productModel.insertMany(products)
      if(result){
       return res.status(200).send({message:"Success" , result:result})
      } 
      return res.status(500).send({message:"Somthing went wrong"})
    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Somthing went wrong"})
    }
  }

  async getProduct(req,res) {
    try {
      const result = await productModel.find({})
      if(result){
        return res.status(200).send({message:"Sucess", products:result})
      }
      return res.status(500).send({message:"Somthing went wrong"})

    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Internal server error"})
    }
  }

  async getProductbyId(req,res){
      try {
        const {id} = req.params
        if(!id){
        return  res.status(400).send({message:"Bad Request"})
        }
        const result = await productModel.findById({_id : id})
        if(result){
         return res.status(200).send({message:"Success",  Product:result})
        }
          return res.status(500).send({message:"Something went wrong"})
      } catch (error) {
        console.log(error)
        return res.status(500).send({message:"Internal server error"})
      }    
  }

  async GetCart(req,res){
    try {
       const {products} = req.body 
       if(!products){
        return res.status(400).send({message:"Missing dependency products"})
       }

       const cart = await productModel.find({_id:products}).select(["name","price","brand","countInstock","category","image"])

       if(!cart){
        return res.status(500).send({message:"Something went wrong"})
       }
       return res.status(200).send({message:"Sucess",products:cart})
    } catch (error) {
      console.log(error)
      return res.status(500).send({message:"Internal Server error"})
    }
  }

}

const productController = new ProductController()

export default productController