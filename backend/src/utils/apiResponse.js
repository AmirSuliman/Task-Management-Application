class ApiResponse {
  static success(data, message = "Success", statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
    };
  }

  static error(message = "Error", statusCode = 500, errors = null) {
    const response = {
      success: false,
      message,
      statusCode,
    };

    if (errors) {
      response.errors = errors;
    }

    return response;
  }
}

module.exports = ApiResponse;
