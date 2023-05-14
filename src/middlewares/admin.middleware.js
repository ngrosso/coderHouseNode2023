
const auth = (req, res, next) =>
{
   if (req.session?.user?.admin)
   {
     return next()
   }

   return res.status(401).send({ message: 'Error de autorización!'})
}

export default auth;
