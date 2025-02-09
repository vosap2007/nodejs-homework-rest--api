const Contacts = require ('../model/contacts')

 const listContacts = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contacts = await Contacts.listContacts(userId, req.qery)
      return res.json({
        status: "success",
        code: 200,
        data: {
          contacts,
        },
      })
    } catch (e) {
     next(e) 
    }
  }
  
  const getContactById = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.getContactById(userId, req.params.id)
      if(contact) {
       return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      }) 
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: 'Not Found',
        }) 
      }
    } catch (e) {
     next(e) 
    }
  }
  
  const addContact = async (req, res, next) => {
    const userId = req.user?.id
      const contact = await Contacts.addContact(userId, req.body)
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      })
  }
  
  const removeContact = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.removeContact(userId, req.params.id)
      if(contact) {
       return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      }) 
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: 'Not Found',
        }) 
      }
    } catch (e) {
     next(e) 
    }
  }
  
  const updateContact = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if(contact) {
       return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      }) 
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: 'Not Found',
        }) 
      }
    } catch (e) {
     next(e) 
    }
  }

  const updateContactStatus = async (req, res, next) => {
    try {
      const userId = req.user?.id
      const contact = await Contacts.updateContact(userId, req.params.id, req.body)
      if(contact) {
       return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      }) 
      } else {
        return res.status(404).json({
          status: "error",
          code: 404,
          data: 'Not Found',
        }) 
      }
    } catch (e) {
     next(e) 
    }
  }

  module.exports ={
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateContactStatus
  }