resource "aws_apigatewayv2_api" "task_api" {

  name          = "${var.project_name}-http-api"
  protocol_type = "HTTP"

  cors_configuration {

    allow_origins = [
      "http://${aws_s3_bucket_website_configuration.frontend.website_endpoint}"
    ]

    allow_methods = [
      "GET",
      "POST",
      "OPTIONS"
    ]

    allow_headers = [
      "Content-Type"
    ]

    expose_headers = [
      "*"
    ]

    max_age = 300
  }
}


resource "aws_apigatewayv2_integration" "lambda" {

  api_id = aws_apigatewayv2_api.task_api.id

  integration_type = "AWS_PROXY"

  integration_uri = aws_lambda_function.task_api.invoke_arn

  integration_method = "POST"

  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "root" {

  api_id = aws_apigatewayv2_api.task_api.id

  route_key = "GET /"

  target = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}


resource "aws_apigatewayv2_stage" "default" {

  api_id = aws_apigatewayv2_api.task_api.id

  name = "$default"

  auto_deploy = true
}


resource "aws_lambda_permission" "api_gateway" {

  statement_id = "AllowExecutionFromAPIGateway"

  action = "lambda:InvokeFunction"

  function_name = aws_lambda_function.task_api.function_name

  principal = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.task_api.execution_arn}/*/*"
}

resource "aws_apigatewayv2_route" "post_route" {

  api_id = aws_apigatewayv2_api.task_api.id

  route_key = "POST /"

  target = "integrations/${aws_apigatewayv2_integration.lambda.id}"
}