const express = require('express');
const router = express.Router();

const Vacante = require('../models/Vacantes');
const Usuario = require('../models/Usuarios');
const{isAuthenticated,isNotAuthenticated} = require('../config/auth');

//ruta del navegador 
router.get('/vacantes/crear',isAuthenticated, (req, res)=>{
	//ruta archivo de la vista
    res.render('vacantes/crear_vacante');
});



//ruta del navegador 
router.post('/vacantes/crear_vacante',isAuthenticated, async (req, res)=>{
	    const{ titulo, descripcion, trabajo, dinero, ciudad} =req.body;
	    const errors = [];
	    if (!titulo){
	    	errors.push({text: 'El campo titulo no puede estar vacio '})
	    }
	    if (!descripcion){
	    	errors.push({text: 'El campo descripcion no puede estar vacio '})
	    }
	    if (!trabajo){
	    	errors.push({text: 'El campo trabajo no puede estar vacio '})
	    }
	    if (!dinero){
	    	errors.push({text: 'El campo  dinero no puede estar vacio '})
	    }
	    if(!ciudad){
	    	errors.push({text: 'El campo ciudad no puede estar vacio '})
	    }
	    if(errors.length > 0){
	    	//ruta archivo de la vista
	    	res.render('vacantes/crear_vacante',{
	    		errors,
	    	titulo,descripcion,trabajo,dinero,ciudad
	    });
	    	
	    }else{
	    	const NewVacante = new Vacante({ titulo, descripcion, trabajo, dinero, ciudad, usuario_id: req.user.id});
	   		console.log(req.body);
	   		await NewVacante.save();
	   		 req.flash('success_msg', 'Vacante creada');
			res.redirect('/vacantes'); 
		}
	
   
});

//ruta del navegador 
router.get('/vacantes',isAuthenticated, async(req, res)=>{
   const Vacantes = await Vacante.find().sort({date: 'desc'});
   //ruta archivo de la vista
   res.render('vacantes/mostar_vacantes',{ Vacantes});
});


router.get('/vacantes/usuario',isAuthenticated, async(req, res)=>{
	const userid = await Usuario.findById(req.user.id);
	  if (userid._id != req.user.id) {
	  	 req.flash('error_msg', '');
			res.redirect('/vacantes');    
  } else {
  	  //mostrar vacantes de cada usuario.
   const Vacantes = await Vacante.find({usuario_id: userid._id}).sort({date: 'desc'});
   //ruta archivo de la vista
   res.render('vacantes/mostar_u_vacantes',{ Vacantes});
  }

});
router.get('/vacantes/editar/:id',isAuthenticated, async (req, res) => {
	const vacante = await Vacante.findById(req.params.id);
	res.render('vacantes/editar_vacante', {vacante});
});

router.put('/vacantes/actualizar/:id',isAuthenticated, async (req, res) => {
	const {titulo, descripcion, trabajo, dinero, ciudad}= req.body;
	await Vacante.findByIdAndUpdate(req.params.id, {titulo, descripcion, trabajo, dinero, ciudad});
	 req.flash('success_msg', 'Vacante actualizada');
	res.redirect('/vacantes');
});

router.delete('/vacantes/eliminar/:id',isAuthenticated, async (req, res) => {
  await Vacante.findByIdAndDelete(req.params.id);
   req.flash('success_msg', 'Vacante eliminada');
  res.redirect('/vacantes/usuario');
  });
module.exports = router;