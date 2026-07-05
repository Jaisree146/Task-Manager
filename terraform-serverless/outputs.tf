output "website_url" {
  value = aws_s3_bucket_website_configuration.frontend.website_endpoint
}

output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "api_url" {
  value = aws_apigatewayv2_api.task_api.api_endpoint
}

output "lambda_name" {
  value = aws_lambda_function.task_api.function_name
}

output "dynamodb_table" {
  value = aws_dynamodb_table.tasks.name
}