
const auth = (req, res, next) =>
{
   if (req.session?.user?.admin)
   {
     return next()
   }

   return res.status(403).send({ message: 'Error de privilegios!'})
}

export default auth;
