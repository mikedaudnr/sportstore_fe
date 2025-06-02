<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'sale_price' => $this->sale_price,
            'current_price' => $this->current_price,
            'discount_percentage' => $this->discount_percentage,
            'sku' => $this->sku,
            'stock_quantity' => $this->stock_quantity,
            'is_featured' => $this->is_featured,
            'average_rating' => round($this->average_rating, 1),
            'reviews_count' => $this->reviews_count ?? $this->reviews()->count(),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'brand' => new BrandResource($this->whenLoaded('brand')),
            'images' => ProductImageResource::collection($this->whenLoaded('images')),
            'meta' => [
                'title' => $this->meta_title,
                'description' => $this->meta_description
            ],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
