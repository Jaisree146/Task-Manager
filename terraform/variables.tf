variable "aws_region" {
  description = "AWS Region"
  type        = string
}

variable "ecr_repository_name" {
  description = "ECR Repository Name"
  type        = string
}

variable "ecs_cluster_name" {
  description = "ECS Cluster Name"
  type        = string
}

variable "ecs_service_name" {
  description = "ECS Service Name"
  type        = string
}

variable "task_family" {
  description = "Task Definition Family"
  type        = string
}
variable "db_host" {
  type = string
}

variable "db_user" {
  type = string
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "db_name" {
  type = string
}

variable "jwt_secret" {
  type      = string
  sensitive = true
}