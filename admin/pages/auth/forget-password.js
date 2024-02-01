const { default: BlankLayout } = require("@/components/layouts/BlankLayout");

const ForgetPassword = () => {
    return (
        <div>
            ForgetPassword
        </div>
    );
}


ForgetPassword.getLayout = (page) => {
    return (
        <BlankLayout>{page}</BlankLayout>
    )
}

export default ForgetPassword;