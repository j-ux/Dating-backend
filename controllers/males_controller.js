const { validationResult } = require('express-validator')

const Male = require('../models/male')



async function index(req,res,next) {

    let males;
    try{
        males = await Male.find()

    }catch (e) {
        return  res.status(417).json({message:e})
    }

    res.status(200).json({males})

}

const show = async (req,res,next)=> {

    const maleId = req.params.male_id

    let male;
    try {
        male = await Male.findById(maleId)

    } catch (e) {
        return res.status(422).json({message:"Invalid male id"})

    }
    return res.status(200).json({male:male.toObject({getters:true})})


}



const store = async (req,res) =>{

    const {  name, email, phone,hobbies,employment_status,marital_status,age} = req.body


    const error =  validationResult(req)

    if(!error.isEmpty()){

        return res.status(422).json({message:error})
    }

    const newMale = new Male({
        name,
        email,
        phone,
        hobbies,
        employment_status,
        marital_status,
        age,

    })


    try{
        await newMale.save()
    }catch (e) {
        return res.status(422).json({message:"Individual not saved!"})
    }



    return res.status(201).json({male:newMale})
}



const update= async (req,res) =>{


    const male_id = req.params.male_id
    const { name,email,phone,hobbies,employment_status,marital_status,age } = req.body

    let male;
    try{
        male = await Male.findById(male_id)

    }catch (e) {
        return res.status(422).json({message:e})
    }
    male.name = name
    male.email = email
    male.phone = phone
    male.hobbies = hobbies
    male.employment_status = employment_status
    male.marital_status = marital_status
    male.age = age


    try{
        await male.save()

    }catch (e) {
        return res.status(417).json({message:e})

    }



    res.status(202).json({male})
}


const deleteMale = async (req,res) =>{

    const male_id = req.params.male_id


    let male;

    try{
        male = await Male.findById(male_id)
    }catch (e) {
        return res.status(422).json({message:e})
    }


    try{
        await Male.remove({male_id:male_id})

    }catch (e) {
        return res.status(422).json({message:"Unable to delete individual"})

    }



    try{
        await male.remove()
    }catch (e) {
        return res.status(417).json({message:e})
    }


    res.status(202).json({message:"Individual deleted"})
}

exports.index = index
exports.show = show
exports.store = store
exports.update = update
exports.deleteMale = deleteMale