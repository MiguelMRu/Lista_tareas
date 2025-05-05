export function dragDrop() {
   
    const columns = document.querySelectorAll('.column');

    columns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const bottomTask = insertAboverTask(column, e.clientY);
            const draggingTask = document.querySelector('.dragging');
            if(!bottomTask){
                column.appendChild(draggingTask);
            } else {
                bottomTask.parentNode.insertBefore(draggingTask, bottomTask);
            }
        });
    });


    const insertAboverTask = (column, y) => {
        const els = column.querySelectorAll('.tasks:not(.dragging)');
        let closest = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
        els.forEach((el) => {
            const { top } = el.getBoundingClientRect();
            const offset = y - top;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closest = el;

            }
        });
        return closest;
    };
    
    
}
