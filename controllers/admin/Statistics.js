export default {
    index: (req ,res) => {
        res.render('layout' ,{
            title: 'Admin Portal',
            current_uri : '/admin/statistics',
            uri_group: ''
        })
    }
}