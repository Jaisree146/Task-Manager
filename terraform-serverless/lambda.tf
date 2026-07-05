data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "${path.module}/lambda/app.py"
  output_path = "${path.module}/lambda/lambda.zip"
}

resource "aws_lambda_function" "task_api" {

  function_name = "${var.project_name}-api"

  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256

  role = aws_iam_role.lambda_role.arn

  handler = "app.lambda_handler"
  runtime = "python3.12"

  timeout = 10

  environment {
    variables = {
      TABLE_NAME = aws_dynamodb_table.tasks.name
    }
  }

  depends_on = [
  aws_iam_role_policy_attachment.lambda_logs,
  aws_iam_role_policy_attachment.lambda_dynamodb
]
}