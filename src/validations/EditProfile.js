import * as Yup from 'yup';

// -- edit profile rules --
const profileValidation = Yup.object().shape({
    username: Yup.string()
        .required('username tidak boleh kosong')
        .min(8, 'minimal 8 karakter')
        .max(20, 'maksimal 20 karakter'),
    // password: Yup.string()
    //     .nullable()
    //     .min(8, 'minimal 8 karakter')
    //     .max(20, 'maksimal 20 karakter'),
    // old_password: Yup.string()
    //     .when(['password'], {
    //         is: (password) => password != null,
    //         then: Yup.string()
    //         .required('password lama tidak boleh kosong')            
    //     })
});

export default profileValidation;