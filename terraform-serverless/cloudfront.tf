

resource "aws_cloudfront_distribution" "frontend" {

  enabled = true

  default_root_object = "index.html"

  origin {

    domain_name = aws_s3_bucket_website_configuration.frontend.website_endpoint

    origin_id = "task-manager-s3-origin"

    custom_origin_config {

      http_port = 80

      https_port = 443

      origin_protocol_policy = "http-only"

      origin_ssl_protocols = [
        "TLSv1.2"
      ]
    }
  }

  default_cache_behavior {

    allowed_methods = [
      "GET",
      "HEAD"
    ]

    cached_methods = [
      "GET",
      "HEAD"
    ]

    target_origin_id = "task-manager-s3-origin"

    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {

      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  restrictions {

    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Project = var.project_name
  }
}