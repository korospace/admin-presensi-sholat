import * as Yup from 'yup';

// -- date range rules --
const dateRangeValidation = Yup.object().shape({
    datestart: Yup.string()
        .required(' '),
    dateend: Yup.string()
            .required(' ')
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

export default dateRangeValidation;