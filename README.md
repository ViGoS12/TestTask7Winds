# Test Task for 7Winds

## Задача:

От вас требуется верстка всего экрана (всё кроме строк не является интерактивным, но это нужно сверстать). Верстка таблицы и создание/редактирование/сохранение строк и уровней.
Так же заметьте что функции saveRow и editRow возвращают массив изменённых строк, от вас требуется обработать его, и внести изменения в нужные строки в том месте, где вы их храните.

### Используйте в своём коде эти функции, изменять функцию recalculation запрещается:

```Typescript
interface NewRowData {
		title: string // Наименование работ
		unit: string // Ед. изм.
		quantity: number // Количество
		unitPrice: number // Цена за ед.
		price: number // Стоимость

		parent: number | null // id уровня, в котором находится (либо null для первого уровня)
		type: 'level' | 'row'
}

interface RowData extends NewRowData {
		id: number
}

// функция для сохранения строки
function saveRow(rowData: NewRowData, storage: RowData[]) {
		const index = Math.max(...storage.map((v) => v.id), 0) + 1
		const row: RowData = {id: index, ...rowData}

		storage.push(row)
		return {
				current: row,
				changed: recalculation(row.parent, storage)
		}
}

// функция для изменения строки
function editRow(row: RowData, storage: RowData[]) {
    const index = storage.findIndex((v) => v.id === row.id)
    storage.splice(index, 1, row)

    return {
        current: row,
        changed: recalculation(row.parent, storage)
    }
}

function recalculation(parentID: number | null, storage: RowData[]) {
		const rows = [...storage]
    const changedRows: RowData[] = []

		if (parentID == null) return changedRows
    let currentParentIndex = rows.findIndex((v) => v.id === parentID)
    if (currentParentIndex === -1) return changedRows
    let currentParent = rows[currentParentIndex]

    do {
        const children = rows.filter((v) => v.parent == currentParent.id)
        const newPrice = children.reduce((acc, v) => acc + v.price, 0)
        if (currentParent.price === newPrice) break

        rows[currentParentIndex].price = newPrice
        changedRows.push(rows[currentParentIndex])

        currentParentIndex = rows.findIndex((v) => v.id === currentParent.parent)
    } while (currentParentIndex !== -1)

    return changedRows
}
```

## Термины

Уровень - строка в таблице содержащая значения только в колонке стоимость (а так же имеющая `type: 'level'`).
Расчёт - строка не являющаяся уровнем, имеет `type: 'row'`.
Режим редактирования - режим в котором можно редактировать значения строк.

## Первый вход на экран

При первом входе на экран сайта должна отображаться строка первого уровня в режиме редактирования.

## Создание строки

Для создания новой строки нужно нажать на иконку уже существующей строки (как показано на втором экране макета)
**Нажать на иконку строки которая в данный момент редактируется нельзя.**
При нажатии на иконку уровня имеется возможность создать такой же уровень, уровень ниже, и расчёт.
После создания появляется пустая строка в режиме редактирования.

## Редактирование и сохранение строки

Что бы редактировать строку нужно дважды нажать на ячейку, в которой находится значение. После двойного клика вся строка переходит в режим редактирования.
Что бы сохранить строку требуется нажать `Enter` внутри любого поля ввода внутри строки.

## Ограничения

При редактировании уровня мы можем редактировать только столбец `Наименование работ`.
При редактировании расчёта мы не можем редактировать столбец `Стоимость`, значение в этом столбце рассчитывается по формуле `Количество * Цена за ед.`.
Каждая строка по умолчанию должна иметь `Стоимость` равную `0`, позаботьтесь об этом.
При отображении уровней скрывайте значения в столбцах: `Ед. изм.`, `Количество` и `Цена за ед.`
