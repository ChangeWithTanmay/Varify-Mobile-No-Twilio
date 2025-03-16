const otpGenerator = () => {
    const Number = '0123456789';
    let OTP = ''
    for (let i = 0; i < 6; i++) {
        const ranIndex = Math.random() * Number.length
        OTP += Number.charAt(ranIndex);

    }
    console.log(OTP);
    return OTP;
}

export {
    otpGenerator,
}