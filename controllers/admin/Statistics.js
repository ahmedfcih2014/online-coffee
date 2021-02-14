export default {
    index: (req ,res) => {
        res.render('admin/layout' ,{
            title: 'Admin Portal',
            current_uri : '/admin/statistics',
            uri_group: ''
        })
    }
}