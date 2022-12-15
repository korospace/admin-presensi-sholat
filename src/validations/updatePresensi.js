import * as Yup from 'yup';

const updatePresensiRules = Yup.object().shape({
    status: Yup.string()
        .required(' '),
});

export default updatePresensiRules;