const functionWrapper = async function (context, req, action) {
    let body = {
        success: true
    }

    let status = 200;

    try {
        context.log('Action - run')
        await action(body);
        context.log('Action - done')
    }
    catch (ex) {
        context.log('Action - fail')
        body.ex = ex;
        body.success = false;
        status = 500;
    }

    context.res = {
        status: status,
        body: body
    }
}

module.exports = {
    functionWrapper: functionWrapper
}