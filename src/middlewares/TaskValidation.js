const TaskModel = require('../model/TaskModel');
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
    
    const { macaddress, type, title, description, when } = req.body;

    if (!macaddress)
        return res.status(400).json({ error: 'MacAddress is mandatory!!' });
    else if (!type)
        return res.status(400).json({ error: 'Type is mandatory!!' })
    else if (!title)
        return res.status(400).json({error: 'Title is mandatory!!'})
    else if (!description)
        return res.status(400).json({ error: 'Description is mandatory!!' })
    else if (!when)
        return res.status(400).json({ error: 'Date and Time are mandatory!!' })
    else {

        let exists;

        if (req.params.id) {
            exists = await TaskModel.
                          findOne(
                            {
                                '_id': { '$ne': req.params.id },
                                'when': { '$eq': new Date(when) },
                                'macaddress': { '$in': macaddress }
                            }
                          );
        } else {

            if (isPast(new Date(when)))
            return res.status(400).json({ error: 'You should only  choose future date and time!!' })
            
            exists = await TaskModel.
                findOne(
                    {
                        'when': { '$eq': new Date(when) },
                        'macaddress': { '$in': macaddress }
                    }
                );
        }

    
        if (exists) {
            return res.status(400).json({error: 'Sorry, there is already a task on this day and time!! Check it!!'})
        }

        next()   
    }
}

module.exports = TaskValidation;