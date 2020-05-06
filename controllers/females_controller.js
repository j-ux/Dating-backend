const { validationResult } = require('express-validator')

const Female = require('../models/female')


async function index(req,res,next) {

    let females;
    try{
        females = await Female.find()

    }catch (e) {
        return  res.status(417).json({message:e})
    }

    res.status(200).json({females})

}

const show = async (req,res,next)=> {

    const femaleId = req.params.female_id

    let female;
    try {
        female = await Female.findById(femaleId)

    } catch (e) {
        return res.status(422).json({message:"Invalid female id"})

    }
    return res.status(200).json({female:female.toObject({getters:true})})


}

const store = async (req,res) =>{

    const {  name, email, phone,hobbies,employment_status,marital_status,age} = req.body


    const error =  validationResult(req)

    if(!error.isEmpty()){

        return res.status(422).json({message:error})
    }

    const newFemale = new Female({
        name,
        email,
        phone,
        hobbies,
        employment_status,
        marital_status,
        age,


    })


    try{
        await newFemale.save()
    }catch (e) {
        return res.status(422).json({message:"Individual not saved!"})
    }



    return res.status(201).json({female:newFemale})
}



const update= async (req,res) =>{


    const female_id = req.params.female_id
    const { name,email,phone,hobbies,employment_status,marital_status,age } = req.body

    let female;
    try{
        female = await Female.findById(female_id)

    }catch (e) {
        return res.status(422).json({message:e})
    }

    female.name = name
    female.email = email
    female.phone = phone
    female.hobbies = hobbies
    females.employment_status = employment_status
    females.marital_status = marital_status
    females.age = age



    try{
        await female.save()

    }catch (e) {
        return res.status(417).json({message:e})

    }



    res.status(202).json({female})
}



const deleteFemale = async (req,res) =>{

    const female_id = req.params.female_id


    let female;

    try{
        female = await Female.findById(female_id)
    }catch (e) {
        return res.status(422).json({message:e})
    }

    try{
        await Female .remove({female_id:male_id})

    }catch (e) {
        return res.status(422).json({message:"Unable to delete individual"})

    }

    try{
        await female.remove()
    }catch (e) {
        return res.status(417).json({message:e})
    }


    res.status(202).json({message:"Individual deleted"})
}

exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.deleteFemale = deleteFemale