window.onload = function() {
    
    var addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    
    var content = document.querySelector("#content");
    if (!content) {
        content = document.createElement("div");
        content.id = "content";
        content.style.display = "none";
        document.querySelector(".section1").parentNode.insertBefore(content, document.querySelector(".section1"));
    }
    
    var btn = document.querySelector("#showprice");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "showprice";
        btn.textContent = "Show Total";
        btn.style.display = "none";
        btn.style.width = "200px";
        btn.style.height = "40px";
        btn.style.backgroundColor = "black";
        btn.style.color = "white";
        btn.style.border = "none";
        btn.style.cursor = "pointer";
        btn.style.marginTop = "10px";
        btn.style.borderRadius = "5px";
        
        var totalViewElement = document.querySelector("#total-view");
        if (totalViewElement) {
            totalViewElement.parentNode.insertBefore(btn, totalViewElement.nextSibling);
        } else {
            document.querySelector(".section1").parentNode.appendChild(btn);
        }
    }
    
    var totalView = document.querySelector("#total-view");
    if (!totalView) {
        totalView = document.createElement("div");
        totalView.id = "total-view";
        totalView.style.padding = "15px";
        totalView.style.marginTop = "15px";
        totalView.style.fontSize = "18px";
        totalView.style.backgroundColor = "#f5f5f5";
        totalView.style.borderRadius = "10px";
        totalView.style.border = "1px dashed #ccc";
        totalView.style.color = "#888";
        totalView.style.minHeight = "50px";
        document.querySelector(".section1").parentNode.appendChild(totalView);
    }
    
    var totalprice = 0;
    var addedProducts = [];

    
    if (addToCartButtons.length > 0) {
        
        addToCartButtons.forEach(function(button){
            button.onclick = function(e){
                e.stopPropagation();
                
                
                var productDiv = this.closest('.div1, .div2, .div3, .div4, .div5, .div6, .div7, .div8, .div9, .div10, .div11, .div12, .div13, .div14, .div15, .div16, .div17, .div18, .div19, .div20');
                
                if (!productDiv) return;
                
                var productName = productDiv.querySelector("h3") ? productDiv.querySelector("h3").textContent : "Product";
                var priceText = productDiv.querySelector("p") ? productDiv.querySelector("p").textContent : "0 EGP";
                var price = parseInt(priceText.replace(/[^0-9]/g, ''));
                
            
                totalprice += price;
                addedProducts.push({name: productName, price: price});
                
                
                updateTotalView();
                
                
                if (addedProducts.length > 0) {
                    btn.style.display = "block";
                }
                
                
                this.textContent = " Added!";
                this.style.backgroundColor = "#27ae60";
                setTimeout(() => {
                    this.textContent = "Add to Cart";
                    this.style.backgroundColor = "";
                }, 800);
            };
        });

        
        btn.onclick = function(){
            updateTotalView();
            
            totalView.style.transition = "all 0.3s ease";
            totalView.style.transform = "scale(1.02)";
            setTimeout(() => {
                totalView.style.transform = "scale(1)";
            }, 300);
        };

        
        function updateTotalView() {
            if (addedProducts.length === 0) {
                totalView.innerHTML = " Cart is empty";
                totalView.style.backgroundColor = "#f5f5f5";
                totalView.style.border = "1px dashed #ccc";
                totalView.style.color = "#888";
                return;
            }
            
            
            var html = "";
            
        
            addedProducts.forEach(function(item, index) {
                html += (index + 1) + ". " + item.name + " - " + item.price + " EGP<br>";
            });
            
            
            html += "<hr style='margin: 10px 0;'>";
            html += "<strong style='font-size: 22px; color:#000;'>Total: " + totalprice + " EGP</strong>";
            html += "<br><span style='font-size: 14px; color: black;'>Items: " + addedProducts.length + "</span>";
            
            totalView.innerHTML = html;
            totalView.style.backgroundColor = "#BA5A5A";
            totalView.style.border = "2px solid #e74c3c";
            totalView.style.color = "black";
            totalView.style.padding = "15px";
            totalView.style.borderRadius = "10px";
        }

    } else {
        console.log("No 'Add to Cart' buttons found.");
    }
};