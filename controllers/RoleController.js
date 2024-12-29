const Role=require('../models/Role');

const index=async(req,res)=>{
    try {
        const roles=await Role.find();
        res.status(200).json(roles);
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }

}
const store = async (req, res) => {
    try {
      const data = new Role(req.body);
      const role = await data.save();
      res.status(201).json(role);
    } catch (error) {
      res.status(400).json({ message: 'Error adding data', error: error.message });
    }
  };

  const update = async (req, res) => {
    const roleId = req.params.id;
    try {

        if (req.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
            req.password = await bcrypt.hash(req.password, salt); // Hash the new password
        }
        const role = await Role.findById(roleId);
        if (!role) {
         return  res.status(404).json({ message: 'Not Found' });
        }
        role.set(req.body);
        const updatedRole = await role.save();
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
}
module.exports={index,store,update};